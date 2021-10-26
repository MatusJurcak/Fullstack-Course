import { AUTHORIZE } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHORIZE, {
        onError(error) {
            throw new Error(error);
        }
    });
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const response = await mutate({ variables: { credentials: { username, password } } });
        const { data } = response;

        if (data && data.authorize) {
            await authStorage.setAccessToken(data.authorize.accessToken);
            apolloClient.resetStore();
        }

        return response;
    };

    return [signIn, result];

};

export default useSignIn;