export async function authUser() {
    const response = await fetch(`/auth/google`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
    return await response.json();
}