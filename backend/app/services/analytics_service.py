def calculate_average_score(platforms: list[dict]) -> int:
    if not platforms:
        return 0

    total_score = sum(platform["score"] for platform in platforms)
    return round(total_score / len(platforms))
