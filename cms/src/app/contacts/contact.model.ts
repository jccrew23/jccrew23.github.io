export class Contact {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public imageURL: string,
    public group?: Contact[] // optional group of related contacts
  ) {}
}
