const prod = {
  url: {
    HOST_URL: "https://globaleda.dynu.net",
    API_URL: "",
  },
};

const dev = {
  url: {
    HOST_URL: "https://localhost",
    API_URL: "http://localhost:3000",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;

export function isInDevelopmentMode() {
  return process.env.NODE_ENV === "development";
}
