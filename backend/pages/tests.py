from unittest.mock import patch
from django.core.cache import cache 
from django.test import TestCase, override_settings
from .reviews import CACHE_KEY, get_google_reviews
from rest_framework.test import APITestCase
import requests

class GetGoogleReviewsTests(TestCase):
    def setUp(self):
        cache.clear()

    @patch("pages.reviews.requests.get")
    def test_returns_cached_data_without_calling_api(self, mock_get):
        fake_reviews = {"rating": 5.0, "reviews": [{"text": "Great company!"}]}
        cache.set(CACHE_KEY, fake_reviews)

        result = get_google_reviews()

        self.assertEqual(result, fake_reviews)
        mock_get.assert_not_called()

    @override_settings(GOOGLE_PLACE_ID="fake-place-id", GOOGLE_PLACES_API_KEY=None)
    @patch("pages.reviews.requests.get")
    def test_returns_empty_dict_when_settings_missing(self, mock_get):
        result = get_google_reviews()

        self.assertEqual(result, {})
        mock_get.assert_not_called()

    @override_settings(GOOGLE_PLACE_ID="fake-place-id", GOOGLE_PLACES_API_KEY="fake-api-key")
    @patch("pages.reviews.requests.get")
    def test_fetches_and_caches_reviews_on_success(self, mock_get):
        fake_data = {"rating": 4.9, "userRatingCount": 12, "reviews": []}
        fake_response = mock_get.return_value
        fake_response.json.return_value = fake_data

        result = get_google_reviews()

        self.assertEqual(result, fake_data)
        self.assertEqual(cache.get(CACHE_KEY), fake_data)
        mock_get.assert_called_once_with(
            "https://places.googleapis.com/v1/places/fake-place-id",
            headers={
                "Content-Type": "application/json",
                "X-Goog-Api-Key": "fake-api-key",
                "X-Goog-FieldMask": "rating,userRatingCount,reviews",
            },
            timeout=5,
        )

    @override_settings(GOOGLE_PLACE_ID="fake-place-id", GOOGLE_PLACES_API_KEY="fake-api-key")
    @patch("pages.reviews.requests.get")
    def test_returns_empty_dict_on_http_error(self, mock_get):
        fake_response = mock_get.return_value
        fake_response.raise_for_status.side_effect = requests.HTTPError("403 Forbidden")

        result = get_google_reviews()

        self.assertEqual(result, {})
        self.assertIsNone(cache.get(CACHE_KEY))

    @override_settings(GOOGLE_PLACE_ID="fake-place-id", GOOGLE_PLACES_API_KEY="fake-api-key")
    @patch("pages.reviews.requests.get")
    def test_returns_empty_dict_on_network_timeout(self, mock_get):
        mock_get.side_effect = requests.Timeout("Connection timed out")

        result = get_google_reviews()

        self.assertEqual(result, {})
        self.assertIsNone(cache.get(CACHE_KEY))


class GoogleReviewsViewTests(APITestCase):
    @patch("pages.views.get_google_reviews")
    def test_returns_review_with_200_ok(self, mock_get_reviews):
        mock_get_reviews.return_value = {
            "rating": 4.9,
            "userRatingCount": 12,
            "reviews": "Great company - TM"
        }

        response = self.client.get("/api/reviews/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data,
            {
                "rating": 4.9,
                "total_reviews": 12,
                "reviews": "Great company - TM"
            }
        )

