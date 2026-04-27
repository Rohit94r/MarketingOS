def generate_content_ideas(business: str) -> dict:
    business_name = business.strip().lower()

    return {
        "ideas": [
            f"Share a customer success story for your {business_name}.",
            f"Create a behind-the-scenes post showing how your {business_name} works.",
            f"Post a simple offer that helps new customers try your {business_name}.",
        ],
        "captions": [
            f"Ready to grow with a better {business_name}? Start today.",
            f"Your next favorite {business_name} experience is waiting.",
            f"Small steps, real results. Discover what our {business_name} can do.",
        ],
        "hashtags": [
            f"#{business_name.replace(' ', '')}",
            "#marketing",
            "#growth",
            "#smallbusiness",
        ],
    }
