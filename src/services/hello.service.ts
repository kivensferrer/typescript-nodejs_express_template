export class HelloService {
  greet(name: string): string {
    const safe = (name ?? 'World').toString().trim() || 'World';
    return `Hello  ${safe}`;
  }
}
