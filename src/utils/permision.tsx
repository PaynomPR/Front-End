export function adminLevel(role: string) {
  if (role == "1" || role == "2") return true;
  else return false;
}

export function ownerLevel(role: string) {
  if (role == "1") return true;
  else return false;
}

export function blockPage(flag: boolean) {
  if (flag) {
    return true;
  } else {
    return false;
  }
}
