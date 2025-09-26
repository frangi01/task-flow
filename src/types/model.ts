export interface UserDoc {
  _id?: string;          // se usi ObjectId puoi usare ObjectId di mongodb
  email: string;
  password: string;      // hash in prod
  createdAt: Date;
}
