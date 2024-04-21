'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { permanentRedirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export async function createPost(id: string) {
    try {
    // Call database
    } catch (error) {
    // Handle errors
    }

    revalidatePath('/posts'); // Update cached posts
    redirect(`/post/${id}`); // Navigate to the new post page
}

export async function updateUsername(username: string, formData: FormData) {
    try {
    // Call database
    } catch (error) {
    // Handle errors
    }

    revalidateTag('username'); // Update all references to the username
    permanentRedirect(`/profile/${username}`); // Navigate to the new user profile
}