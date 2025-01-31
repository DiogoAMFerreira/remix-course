import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import NoteProps from "~/interfaces/NoteProps";
import styles from "~/styles/note-details.css?url";

export default function NoteDetailsPage() {
  const note: NoteProps = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<NoteProps> {
  const notes = await getStoredNotes();
  const noteId = params.noteId;

  const selectedNote = notes.find((note: NoteProps) => note.id === noteId);

  if (!selectedNote) {
    throw Response.json(
      { message: `Could not find note for id ${noteId}` },
      {
        status: 404,
      }
    );
  }

  return selectedNote;
}

export const meta: MetaFunction = ({ data }: any) => {
  return [
    { title: data.title },
    { description: "Manage your notes with ease" },
  ];
};
