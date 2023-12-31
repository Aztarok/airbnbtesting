import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

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
    const isPropertyPresent = user.user_metadata.hasOwnProperty(propertyName);
    // Update user_metadata with the specified property name and value
    user.user_metadata = {
        ...user.user_metadata,
        [propertyName]: !isPropertyPresent
            ? propertyValue
            : user.user_metadata[propertyName]
    };

    return user;
}

export default async function Home() {
    const { data } = await readUserSession();
    // console.log(data);
    let userObject = "";
    if (!data.session?.user) {
        console.log("wow");
    } else {
        const user = data.session?.user!;
        updateUserMetadata(user, "avatar_url", "someValue");
        userObject = JSON.stringify(user.user_metadata);
    }

    // const supabase = await createSupabaseServerClient();
    // const {
    //     data: { user }
    // } = await supabase.auth.getUser();
    // console.log(user);
    // if (!user) {
    //     redirect("/auth-server-action");
    // }
    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-1">
            {/* <div>{user.id}</div>
            <div>{user.aud}</div>
            <div>{user.email}</div> */}
            <div className="w-full flex bg-red-700">
                <div className="">{!data ? userObject : <h1>Hello</h1>}</div>
            </div>
            <div>Wow</div>
            <div>hi</div>
        </main>
    );
}
