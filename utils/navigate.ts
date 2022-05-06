export default function navigate(path: string, query: any = null) {
  return navigateTo({
    path,
    query,
  });
}
