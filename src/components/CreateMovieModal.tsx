import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import { GENRES } from "../types/genre";
import type { CreateMovieData } from "../features/movies/contexts/MoviesContext";
import "../styles/CreateMovieModal.css";

interface CreateMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateMovieModal = ({
  isOpen,
  onClose,
}: CreateMovieModalProps) => {
  const moviesCtx = useContext(MoviesContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMovieData>({
    defaultValues: {
      title: "",
      year: new Date().getFullYear(),
      genres: [],
      actors: [],
      description: "",
      posterUrl: "",
      rating: 0,
    },
  });

  if (!moviesCtx) {
    throw new Error("MoviesContext must be used within MoviesProvider");
  }
  const [actorsInput, setActorsInput] = useState("");

  const onSubmit = (data: CreateMovieData) => {
    try {
      const actors = actorsInput
        .split(",")
        .map((a: string) => a.trim())
        .filter(Boolean);

      if (actors.length === 0) {
        alert("Please enter at least one actor.");
        return;
      }

      const movieData: CreateMovieData = {
      ...data,
      actors, 
    };

      moviesCtx.createMovie(movieData);
      onClose();
      reset();
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-movie-modal-overlay">
      <div className="create-movie-modal">
        <div className="create-movie-modal__header">
          <h2 className="create-movie-modal__title">Create New Movie</h2>
          <button className="create-movie-modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="create-movie-modal__form"
        >
          <div className="create-movie-modal__field">
            <label htmlFor="title" className="create-movie-modal__label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="create-movie-modal__input"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="create-movie-form-error">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="create-movie-modal__field">
            <label htmlFor="year" className="create-movie-modal__label">
              Year
            </label>
            <input
              type="number"
              id="year"
              className="create-movie-modal__input"
              {...register("year", {
                required: "Year is required",
                min: {
                  value: 1900,
                  message: "Year must be 1900 or later",
                },
                max: {
                  value: new Date().getFullYear(),
                  message: "Year cannot be in the future",
                },
                valueAsNumber: true,
              })}
            />
            {errors.year && (
              <span className="create-movie-form-error">
                {errors.year.message}
              </span>
            )}
          </div>

          <div className="create-movie-modal__field">
            <label htmlFor="genres" className="create-movie-modal__label">
              Genres (hold Ctrl/Cmd to select multiple)
            </label>
            <select
              id="genres"
              multiple
              className="create-movie-modal__select create-movie-modal__select--multiple"
              {...register("genres", {
                required: "Select at least one genre",
                validate: (value) =>
                  value.length > 0 || "Select at least one genre",
              })}
            >
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            {errors.genres && (
              <span className="create-movie-form-error">
                {errors.genres.message}
              </span>
            )}
          </div>
          <div className="create-movie-modal__field">
            <label>Actors (separate with commas)</label>
            <input
              value={actorsInput}
              onChange={(e) => setActorsInput(e.target.value)}
              placeholder="e.g. Tom Hanks, Natalie Portman"
            />
            {actorsInput.trim() === "" && (
              <span className="create-movie-form-error">
                At least one actor is required
              </span>
            )}
          </div>

          <div className="create-movie-modal__field">
            <label htmlFor="description" className="create-movie-modal__label">
              Description
            </label>
            <textarea
              id="description"
              className="create-movie-modal__textarea"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
            />
            {errors.description && (
              <span className="create-movie-form-error">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="create-movie-modal__field">
            <label htmlFor="posterUrl" className="create-movie-modal__label">
              Poster URL
            </label>
            <input
              id="posterUrl"
              className="create-movie-modal__input"
              {...register("posterUrl", {
                required: "Poster URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message:
                    "Must be a valid URL starting with http:// or https://",
                },
              })}
            />
            {errors.posterUrl && (
              <span className="create-movie-form-error">
                {errors.posterUrl.message}
              </span>
            )}
          </div>

          <div className="create-movie-modal__actions">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
              className="create-movie-button create-movie-button--secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="create-movie-button create-movie-button--primary"
            >
              Create Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
