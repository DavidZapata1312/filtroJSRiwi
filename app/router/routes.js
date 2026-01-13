export const routes = {
    "/": {
        template: "app/templates/login.html",
        publicOnly: true,
    },
    "/register": {
        template: "app/templates/register.html",
        publicOnly: true,
    },
    "/admin": {
        template: "app/templates/admin.html",
        protected: true,
        role: "admin",
        script: () =>
            import("../pages/admin.js").then(m => m.setupDashboard()),
    },
    "/newEvent": {
        template: "app/templates/newEvent.html",
        protected: true,
        role: "admin",
        script: () =>
            import("../pages/newEvent.js").then(m => m.setupNewEvent()),
    },
    "/public": {
        template: "app/templates/public.html",
        protected: true,
        script: () =>
            import("../pages/public.js").then(m => m.setupPublic()),
    },
};
