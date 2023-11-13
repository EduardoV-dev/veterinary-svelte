<script lang="ts">
    import { type PetDAO } from "@/api/pets";
    import { formatDate } from "@/utils/date-format";

    export let pets: PetDAO[];
    export let selectPetIdToEdit: (petId: string | null) => void;
    export let removePet: (id: string) => void;
</script>

<section class="list">
    {#each pets as pet}
        <div class="pet-card">
            <div class="pet-card__information">
                <section>
                    <h3>Pet's data</h3>

                    <p>Name: <strong>{pet.name}</strong></p>
                    <p>Symptons: <strong>{pet.symptons}</strong></p>
                </section>

                <section>
                    <h3>Owner's data</h3>

                    <p>Name: <strong>{pet.owner.name}</strong></p>
                    <p>Email: <strong>{pet.owner.email}</strong></p>
                </section>
            </div>

            <p>
                Discharge Date: <strong>{formatDate(pet.dischargeDate)}</strong>
            </p>
            <p>Registered on: <strong>{formatDate(pet.createdAt)}</strong></p>
            <p>Last Update on: <strong>{formatDate(pet.updatedAt)}</strong></p>

            <div class="actions">
                <button
                    class="actions__remove"
                    on:click={() => removePet(pet.id)}
                    type="button">Remove</button
                >
                <button
                    class="actions__edit"
                    on:click={() => selectPetIdToEdit(pet.id)}
                    type="button">Edit</button
                >
            </div>
        </div>
    {/each}
</section>

<style lang="scss">
    .list {
        align-self: start;

        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 25rem), 1fr));
        gap: 3rem;
    }

    .pet-card {
        background-color: #111;
        border-radius: 10px;
        padding: 1rem 2rem;

        &__information {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;

            margin-bottom: 2rem;
        }

        h3 {
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }

        p {
            text-align: center;

            strong {
                font-weight: 700;
            }
        }

        .actions {
            margin-top: 2rem;

            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;

            &__remove {
                background-color: #df5151;
                color: #fff;
            }

            &__edit {
                background-color: #7171ff;
                color: #fff;
            }
        }
    }
</style>
