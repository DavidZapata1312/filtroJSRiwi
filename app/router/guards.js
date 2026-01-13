export function canAccessRoute(route, user) {
    if (route.publicOnly && user) return false;
    if (route.protected && !user) return false;
    return !(route.role && user?.role !== route.role);

}
