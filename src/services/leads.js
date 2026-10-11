export async function submitLead(data) {
  let response;
  try {
    response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error(
      "We could not reach the server. Your details are still here. Please try again.",
    );
  }
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("The server is unavailable. Please try again shortly.");
  }
  if (!response.ok) {
    const error = new Error(
      result.message || "We could not save your inquiry. Please try again.",
    );
    error.fields = result.errors;
    throw error;
  }
  return result;
}
