import Link from "next/link";
import { LinkIt, LinkItUrl } from "react-linkify-it";
import UserLinkWithTooltip from "./UserLinkWithTooltip";


export default function Linkify({ children }) {
    return (
        <LinkifyUsername>
            <LinkifyHashtag>
                <LinkifyUrl>{children}</LinkifyUrl>
            </LinkifyHashtag>
        </LinkifyUsername>
    );
}

function LinkifyUrl({ children }) {
    return (
        <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
    );
}

function LinkifyUsername({ children }) {
    return (
        <LinkIt
            regex={/(@[a-zA-Z0-9_-]+)/}
            component={(match, key) => (
                <UserLinkWithTooltip key={key} username={match.slice(1)}>
                    {match}
                </UserLinkWithTooltip>
            )}
        >
            {children}
        </LinkIt>
    );
}

function LinkifyHashtag({ children }) {
    return (
        <LinkIt
            regex={/(#[a-zA-Z0-9]+)/}
            component={(match, key) => (
                <Link
                    key={key}
                    href={`/hashtag/${match.slice(1)}`}
                    className="text-primary hover:underline"
                >
                    {match}
                </Link>
            )}
        >
            {children}
        </LinkIt>
    );
}
