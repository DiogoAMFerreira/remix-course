import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote/NewNote";
import NoteList, {
  links as noteListLinks,
} from "~/components/NoteList/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote></NewNote>
      <NoteList notes={notes}></NoteList>
    </main>
  );
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function ErrorBoundary() {
  const error: unknown = useRouteError();

  if (isRouteErrorResponse(error)) {
    const message = error.data?.message || "Data not found";
    return (
      <main>
        <NewNote></NewNote>
        <p className="info-message">{message}</p>
      </main>
    );
  }

  return (
    <main className="error">
      <h1>An error related to your notes occurred!</h1>
      <p>{(error as Error)?.message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw Response.json(
      { message: "Could not find any notes" },
      { status: 404, statusText: "Not found" }
    );
  }

  return notes;

  //React style return
  //   return new Response(JSON.stringify(notes), {
  //     headers: { "Content-Type": "application/json" },
  //   });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  //   const noteData = {
  //     title: formData.get("title"),
  //     content: formData.get("content"),
  //   };

  // Validation ...
  if (noteData.title.toString().trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long" };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);

  //Delay for testing purposes
  //   await new Promise<void>((resolve, reject) =>
  //     setTimeout(() => resolve(), 2000)
  //   );

  await storeNotes(updatedNotes);

  //This reloads the JS. Make sure you are using a Form instead of a form so it doesn't refresh
  return redirect("/notes");
}

export const meta: MetaFunction = () => {
  return [
    { title: "All notes" },
    { description: "Manage your notes with ease" },
  ];
};
