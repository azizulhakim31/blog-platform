import { useState } from "react";
import { FiArrowRight, FiMail } from "react-icons/fi";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email.trim()) return;

        setSubscribed(true);
        setEmail("");
    }

    return (
        <div className="rounded-3xl border border-primary/20 bg-primary/5 px-6 py-12 text-base-content sm:px-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary text-primary-content">
                    <FiMail size={23} />
                </div>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Thoughtful stories, delivered to your inbox.
                </h2>
                <p className="mx-auto mt-4 max-w-lg leading-7 text-base-content/70">
                    Subscribe for thoughtful articles, fresh ideas, and inspiring reads. We would be pleased to share them with you.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
                >
                    <input
                        type="email"
                        required
                        aria-label="Email address"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                            setSubscribed(false);
                        }}
                        className="input input-bordered w-full bg-base-100 text-base-content"
                    />

                    <button
                        type="submit"
                        className="btn btn-primary shrink-0"
                    >
                        Subscribe
                        <FiArrowRight />
                    </button>
                </form>

                {subscribed && (
                    <p role="status" className="mt-4 text-sm text-success">
                        Thank you for your interest! Newsletter subscriptions are not available just yet.
                    </p>
                )}

                <p className="mt-4 text-xs text-base-content/60">
                    Occasional emails, with no spam. Unsubscribe at any time.
                </p>
            </div>
        </div>
    );
};

export default Newsletter;