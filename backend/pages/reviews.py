from django.conf import settings
from django.core.cache import cache
import requests

CACHE_KEY = "google_places_reviews"
CACHE_TIMEOUT = 86400

def get_google_reviews():
    cached_data = cache.get(CACHE_KEY)
    if cached_data is not None:
        return cached_data

    place_id = getattr(settings, "GOOGLE_PLACE_ID", None)
    api_key = getattr(settings, "GOOGLE_PLACES_API_KEY", None)


    if not place_id or not api_key:
        return {}

    url = f"https://places.googleapis.com/v1/places/{place_id}"

    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
    }

    try:
        response = requests.get(url, headers=headers, timeout=5)
        response.raise_for_status()
        data = response.json()

        cache.set(CACHE_KEY, data, CACHE_TIMEOUT)
        return data
    except Exception as e:
        print("ERROR:", repr(e))
        return {}


