import readUserSession from "@/lib/actions";

interface User {
    id: string;
    aud: string;
    role?: string | undefined;
    email?: string | undefined;
    email_confirmed_at?: string | undefined;
    // ... other properties ...

    app_metadata: {
        provider?: string | undefined;
        providers?: string[];
    };

    user_metadata: {
        [key: string]: any;
    };

    identities?: {
        identity_id: string;
        id: string;
        user_id: string;
        // ... other identity properties ...
    }[];

    created_at: string;
    updated_at?: string | undefined;
}

function updateUserMetadata(
    user: User,
    propertyName: string,
    propertyValue: any
): User {
    if (user) {
        user.user_metadata = {
            ...user.user_metadata,
            [propertyName]: user.user_metadata.hasOwnProperty(propertyName)
                ? user.user_metadata[propertyName]
                : propertyValue
        };
    }

    return user;
}

function getUserMetadata(
    user: User | undefined,
    propertyName: string
): any | undefined {
    return user?.user_metadata?.hasOwnProperty(propertyName)
        ? user.user_metadata[propertyName]
        : undefined;
}

export default async function Home() {
    const { data } = await readUserSession();
    const user = data.session?.user;
    let keyValueArray: string[] = [];
    let user_name = "";
    let email = "";
    let avatar_url = "";

    if (user) {
        updateUserMetadata(user, "avatar_url", "someValue");
        const jsonObject = JSON.parse(JSON.stringify(user.user_metadata));
        keyValueArray = Object.entries(jsonObject).map(
            ([key, value]) => `${key}: ${value}`
        );
        console.log(keyValueArray);
        user_name =
            getUserMetadata(user, "user_name") ||
            getUserMetadata(user, "full_name") ||
            "blank";
        email = getUserMetadata(user, "email");
        avatar_url = getUserMetadata(user, "avatar_url") || "";
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-1">
            <div>
                {keyValueArray.map((str) => (
                    <div key={str}>{str}</div>
                ))}
            </div>
            <div>{user?.email}</div>
            <div>{user_name}</div>
            <div>{email}</div>
            <div>{avatar_url}</div>
        </main>
    );
}
