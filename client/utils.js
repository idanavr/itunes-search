// page only for roles pass through props
export const isAllowedToUserRole = (user, rolesAllowed) => (user && user.role && rolesAllowed.includes(user.role.toLowerCase()));