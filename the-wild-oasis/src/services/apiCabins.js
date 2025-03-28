import supabase from "./supabaseClient"

export async function getCabins() {
    let { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error)
        throw new Error('Cabins could not be loaded')
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Cabin could not be deleted')
    }

    return data;
}

//https://zudlswpsdtjmtawbnnrr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
export async function createCabin(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", '');
    const imagePath = `https://zudlswpsdtjmtawbnnrr.supabase.co/storage/v1/object/public/cabin-images/${imageName}`

    //1.create cabin
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    if (error) {
        console.error(error)
        throw new Error('Cabin could not be created')
    }
    //2. if success -> upload image

    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    //3.delete cabin if image was not successfully uploaded
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);
            throw new Error('Cabin image was not uploaded and the cabin was deleted')
    }

    return data;
}