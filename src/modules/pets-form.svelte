<script lang="ts">
    import FormElement from "@/components/form-element.svelte";
    import { type PetDTO } from "@/api/pets";

    const FORM_INITIAL_STATE: PetDTO = {
        dischargeDate: "",
        name: "",
        symptons: "",
        ownerName: "",
        ownerEmail: "",
    };

    export let formInitialState: PetDTO | undefined = undefined;

    export let onAdd: (pet: PetDTO) => void;
    export let onEdit: (pet: PetDTO) => void;

    let form: PetDTO = { ...(formInitialState ?? FORM_INITIAL_STATE) };

    const clearInputs = (): void => {
        form = { ...FORM_INITIAL_STATE };
        formInitialState = undefined;
    };

    const onSubmit = (): void => {
        if (!formInitialState) onAdd(form);
        else onEdit(form);
        clearInputs();
    };
</script>

<form class="form" on:submit|preventDefault={onSubmit}>
    <FormElement
        id="name"
        type="text"
        label="Name"
        placeholder="Enter your pet's name"
        bind:value={form.name}
    />

    <FormElement
        id="owner"
        type="text"
        label="Owner's name"
        placeholder="Enter Owner's Name"
        bind:value={form.ownerName}
    />

    <FormElement
        id="owner-email"
        type="email"
        label="Owner's email"
        placeholder="Enter Owner's Email"
        bind:value={form.ownerEmail}
    />

    <FormElement
        id="discharge-date"
        type="datetime-local"
        label="Discharge Date"
        placeholder="Select Discharge Date"
        bind:value={form.dischargeDate}
    />

    <FormElement
        id="symptons"
        type="textarea"
        label="Symptons"
        placeholder="Enter The Pet Symptons"
        bind:value={form.symptons}
    />

    <button class="submit" type="submit"
        >{!formInitialState ? "Create" : "Edit"} record</button
    >
</form>

<style lang="scss">
    .form {
        align-self: start;
        position: sticky;
        top: 20px;

        display: grid;
        gap: 1rem;
    }

    .submit {
        margin-top: 1rem;

        background-color: #ff2;
    }
</style>
