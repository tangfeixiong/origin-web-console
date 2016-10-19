window.OPENSHIFT_CONFIG = {
  apis: {
    hostPort: "172.17.4.50:443",
    prefix: "/apis"
  },
  api: {
    openshift: {
      hostPort: "172.17.4.50:30443",
      prefix: "/oapi"
    },
    k8s: {
      hostPort: "172.17.4.50:443",
      prefix: "/api"
    }
  },
  auth: {
    oauth_authorize_uri: "https://172.17.4.50:30443/oauth/authorize",
    oauth_redirect_base: "https://172.17.4.50:9000",
    oauth_client_id: "openshift-web-console",
    logout_uri: ""
  },
  loggingURL: "",
  metricsURL: ""
};

window.OPENSHIFT_VERSION = {
  openshift: "dev-mode",
  kubernetes: "dev-mode"
};
