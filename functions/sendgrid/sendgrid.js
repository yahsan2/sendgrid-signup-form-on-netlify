require('dotenv').config()
const client = require("@sendgrid/client")

// https://sendgrid.api-docs.io/v3.0/contacts/add-or-update-a-contact
async function apiAddContactToList (listId, { email, first_name, last_name }) {
  try {
    const response = await client.request({
      url: '/v3/marketing/contacts',
      method: 'PUT',
      body: {
        list_ids: [listId],
        contacts: [{
          email, first_name, last_name
        }]
      }
    })
    return response
  } catch (error) {
    throw new Error(error);
  }
}

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Function not found..." };
    }
    const { email, first_name, last_name } = JSON.parse(event.body);

    const {
      SENDGRID_LIST_ID,
      SENDGRID_API_KEY,
    } = process.env

    client.setApiKey(SENDGRID_API_KEY)

    const [{ body, statusCode }] = await apiAddContactToList(
      SENDGRID_LIST_ID,
      { email, first_name, last_name }
    ).catch(error => {
      throw error;
    })

    return {
      statusCode,
      body: JSON.stringify(body),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
