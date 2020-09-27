export const hasRole = (user, roles) =>
  roles.some(role => user.includes(role));