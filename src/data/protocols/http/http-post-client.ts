export default interface HttpPostClient {
  post(url: string): Promise<void>;
}
