<script lang="ts">
    import { onMount } from "svelte";
    import { PetAPI, type PetDAO, type PetDTO } from "@/api/pets";
    import PetsForm from "@/modules/pets-form.svelte";
    import PetsList from "@/modules/pets-list.svelte";

    let petsRecords: PetDAO[] = [];
    let petIdToEdit: string | null = null;

    onMount(() => (petsRecords = PetAPI.getPatients()));

    const onPetAdded = (pet: PetDTO): void => {
        const newRecords = PetAPI.createPatient(pet);
        petsRecords = newRecords;
    };

    const onPetEdited = (pet: PetDTO): void => {
        const newPetsRecords = PetAPI.editPatient(petIdToEdit!, pet);
        petsRecords = newPetsRecords;
        petIdToEdit = null;
    };

    const onPetRemoved = (id: string): void => {
        const newPetsRecords = PetAPI.deletePatient(id);
        petsRecords = newPetsRecords;
    };

    const selectPetIdToEdit = (id: string | null): void => {
        petIdToEdit = id;
    };

    const getFormInitialState = (
        petIdToEdit: string | null
    ): PetDTO | undefined => {
        if (!petIdToEdit) return undefined;
        const pet = petsRecords.find((record) => record.id === petIdToEdit);
        if (!pet) return undefined;

        return {
            symptons: pet.symptons,
            name: pet.name,
            ownerName: pet.owner.name,
            ownerEmail: pet.owner.email,
            dischargeDate: pet.dischargeDate,
        };
    };

    // === Render

    $: formInitialState = getFormInitialState(petIdToEdit);
</script>

<main class="container">
    {#key formInitialState}
        <PetsForm {formInitialState} onAdd={onPetAdded} onEdit={onPetEdited} />
    {/key}

    <PetsList removePet={onPetRemoved} {selectPetIdToEdit} pets={petsRecords} />
</main>

<style lang="scss">
    .container {
        padding: 4rem;

        display: grid;
        gap: 5rem;
        grid-template-columns: 0.4fr 1fr;
    }
</style>
