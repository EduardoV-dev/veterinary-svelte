import { LocalStorage } from "@/utils/local-storage";

export interface PetDTO {
  dischargeDate: string;
  name: string;
  ownerEmail: string;
  ownerName: string;
  symptons: string;
}

interface PetOwner {
  name: string;
  email: string;
}

export interface PetDAO extends Omit<PetDTO, "ownerName" | "ownerEmail"> {
  createdAt: string;
  id: string;
  updatedAt: string;
  owner: PetOwner;
}

export class PetAPI {
  public static getPatients = (): PetDAO[] => LocalStorage.retrieve();

  public static createPatient = (pet: PetDTO): PetDAO[] => {
    const records: PetDAO[] = this.getPatients();
    const newPet: PetDAO = {
      name: pet.name,
      symptons: pet.symptons,
      dischargeDate: pet.dischargeDate,
      owner: {
        name: pet.ownerName,
        email: pet.ownerEmail,
      },
      id: crypto.randomUUID(),
      updatedAt: new Date().toJSON(),
      createdAt: new Date().toJSON(),
    };

    const newRecords: PetDAO[] = [...records, newPet];
    LocalStorage.save(newRecords);
    return newRecords;
  };

  public static deletePatient = (id: string): PetDAO[] => {
    const records: PetDAO[] = this.getPatients();
    const newRecords = records.filter((pet) => pet.id !== id);
    LocalStorage.save(newRecords);
    return newRecords;
  };

  public static editPatient = (id: string, pet: PetDTO): PetDAO[] => {
    const records: PetDAO[] = this.getPatients();
    const petToEdit: PetDAO | undefined = records.find(
      (record) => record.id === id,
    );
    if (!petToEdit) return records;

    const editedEntry: PetDAO = {
      ...petToEdit,
      ...pet,
      owner: {
        name: pet.ownerName,
        email: pet.ownerEmail,
      },
      updatedAt: new Date().toJSON(),
    };
    const newRecords: PetDAO[] = records.map((record) =>
      record.id === id ? editedEntry : record,
    );

    LocalStorage.save(newRecords);
    return newRecords;
  };
}
