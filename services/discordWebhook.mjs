async function discordWebhook (url, data) {
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        content: data
    })
  }

const response = await fetch(url, options);
}

export default discordWebhook;