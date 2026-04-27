from sqlalchemy.orm import Session

from app.models.action import ActionTask
from app.models.platform_score import PlatformScore
from app.models.post import Post


def seed_database(db: Session) -> None:
    if db.query(Post).count() == 0:
        posts = [
            Post(
                title="Launch teaser for AI visibility score",
                content="Introduce the AI visibility score with a simple before-and-after workflow.",
                is_scheduled=True,
                scheduled_day=3,
                scheduled_time="Mon 09:00",
                platform="LinkedIn",
            ),
            Post(
                title="Competitor tracking carousel",
                content="Show how MarketingOS turns competitor activity into clear next actions.",
                is_scheduled=True,
                scheduled_day=7,
                scheduled_time="Tue 13:30",
                platform="Instagram",
            ),
            Post(
                title="Founder POV newsletter",
                content="Explain why marketing teams need one system for content, analytics, and actions.",
                is_scheduled=True,
                scheduled_day=11,
                scheduled_time="Thu 10:15",
                platform="Email",
            ),
            Post(
                title="Demo cutdown for paid social",
                content="Promote a short product demo focused on campaign velocity.",
                is_scheduled=True,
                scheduled_day=18,
                scheduled_time="Fri 16:00",
                platform="YouTube",
            ),
            Post(
                title="SEO title refresh brief",
                content="Update page titles around AI marketing operations and campaign planning.",
                is_scheduled=False,
                platform="Search",
            ),
        ]
        db.add_all(posts)

    if db.query(ActionTask).count() == 0:
        tasks = [
            ActionTask(
                title="Rewrite low-performing product page intro",
                status="completed",
                lift="Expected lift +8%",
                action_button_label="View",
            ),
            ActionTask(
                title="Generate 6 paid social launch variants",
                status="pending",
                lift="Expected lift +14%",
                action_button_label="Generate",
            ),
            ActionTask(
                title="Schedule competitor response thread",
                status="pending",
                lift="Expected lift +11%",
                action_button_label="Schedule",
            ),
            ActionTask(
                title="Refresh SEO title cluster",
                status="completed",
                lift="Expected lift +17%",
                action_button_label="Review",
            ),
        ]
        db.add_all(tasks)

    if db.query(PlatformScore).count() == 0:
        scores = [
            PlatformScore(platform="ChatGPT", score=45),
            PlatformScore(platform="Google", score=60),
            PlatformScore(platform="Instagram", score=30),
            PlatformScore(platform="YouTube", score=50),
        ]
        db.add_all(scores)

    db.commit()
