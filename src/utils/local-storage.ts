import type { PetDAO } from "@/api/pets";

const LS_KEY = "pet-patients";

export class LocalStorage {
    public static save = (records: PetDAO[]): void =>
        localStorage.setItem(LS_KEY, JSON.stringify(records));

    public static retrieve = (): PetDAO[] =>
        JSON.parse(localStorage.getItem(LS_KEY) || "[]");
}
