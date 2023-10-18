export function getUserIdFromJwt(token: string): string | undefined {
  const parts = token.split(".");

  if (parts.length !== 3) {
    console.error("Invalid JWT format");
    return undefined;
  }

  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c: string) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  const payload: { [key: string]: any } = JSON.parse(jsonPayload);

  return payload.userId;
}
