class RestStorageService {
  constructor(host = "http://localhost:8080/api") {
    this.host = host;
  }

  async list(table, queryParameters = null) {
    if (queryParameters) {
      const response = await fetch(`${this.host}/${table}/${queryParameters}`);
      const data = await response.json();

      return data;
    } else {
      const response = await fetch(`${this.host}/${table}`);
      const data = await response.json();

      return data;
    }
  }

  async get(table, id) {
    const response = await fetch(`${this.host}/${table}/${id}`);
    const data = await response.json();

    return data;
  }

  async getByEmail(table, email) {
    const response = await fetch(`${this.host}/${table}/email/${email}`);
    const data = await response.json();

    return data;
  }

  async create(table, data) {
    const response = await fetch(`${this.host}/${table}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // get the new id from the response
    const newId = await response.text();

    return newId;
  }

  async update(table, id, data) {
    const response = await fetch(`${this.host}/${table}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  }

  async delete(table, id) {
    const response = await fetch(`${this.host}/${table}/${id}`, {
      method: "DELETE",
    });

    return response;
  }
}

export default RestStorageService;
