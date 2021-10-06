export default function clearLoginState() {
    localStorage.removeItem("user_token");
    localStorage.removeItem("username");
}