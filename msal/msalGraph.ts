import { MsalConfigContextProps } from "./MsalConfigProvider";


export async function getUserPhotoAvatar({ msalInstance: instance, loginRequest, graphConfig }: MsalConfigContextProps) {
    const account = instance!.getActiveAccount();

    if (!account) {
        throw new Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    const tokenResponse = await instance!.acquireTokenSilent({
        ...loginRequest,
        account: account,
    });

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${tokenResponse.accessToken}`);

    const photoEndpoint = `${graphConfig.graphMeEndpoint}/photo/$value`;

    const options = {
        method: "GET",
        headers: headers,
    };

    return fetch(photoEndpoint, options)
        .then((response) => response.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob);

            return url;
        })
        .catch((error) => console.log(error));
}
