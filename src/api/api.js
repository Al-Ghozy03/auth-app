export let base_url = "http://localhost:7000";
export let token = localStorage.getItem("token");
export let headers = { headers: { authorization: `Bearer ${token}` } };
