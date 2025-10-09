// EditMovieModal.tsx
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import type { Movie } from "../types/movie";
import { GENRES } from "../types/genre";
import "../styles/CreateMovieModal.css";

interface EditMovieModalProps {
    movie: Movie;
    onClose: () => void;
}

export const EditMovieModal = ({ movie, onClose }: EditMovieModalProps) => {
    const moviesCtx = useContext(MoviesContext);
    if (!moviesCtx)
        throw new Error("MoviesContext must be used within MoviesProvider");

    const { updateMovie } = moviesCtx;

    // 🎯 inicializar react-hook-form con valores por defecto del movie recibido
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Movie>({
        defaultValues: movie,
    });

    // manejar actores como input separado (string)
    const [actorsInput, setActorsInput] = useState(
        Array.isArray(movie.actors) ? movie.actors.join(", ") : ""
    );

    // sincronizar cambios si cambia la película (por ejemplo, editar otra)
    useEffect(() => {
        reset(movie);
        setActorsInput(Array.isArray(movie.actors) ? movie.actors.join(", ") : "");
    }, [movie, reset]);

    // 🔹 Submit: actualizar película
    const onSubmit = (data: Movie) => {
        const actors = actorsInput
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean);

        if (actors.length === 0) {
            alert("Please enter at least one actor.");
            return;
        }

        const updatedMovie = {
            ...data,
            actors,
        };

        updateMovie(movie.id, updatedMovie);
        onClose();
    };

    return (
        <div className="create-movie-modal-overlay">
            <div className="create-movie-modal">
                <div className="create-movie-modal__header">
                    <h2 className="create-movie-modal__title">Edit Movie</h2>
                    <button
                        className="create-movie-modal__close"
                        onClick={onClose}
                        type="button"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="create-movie-modal__form"
                >
                    {/* Title */}
                    <div className="create-movie-modal__field">
                        <label htmlFor="title" className="create-movie-modal__label">
                            Title
                        </label>
                        <input
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

                    {/* Year */}
                    <div className="create-movie-modal__field">
                        <label htmlFor="year" className="create-movie-modal__label">
                            Year
                        </label>
                        <input
                            id="year"
                            type="number"
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

                    {/* Genres */}
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
                                <option
                                    key={genre}
                                    value={genre}
                                    selected={movie.genres.includes(genre)}
                                >
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

                    {/* Actors */}
                    <div className="create-movie-modal__field">
                        <label>Actors (separate with commas)</label>
                        <input
                            value={actorsInput}
                            onChange={(e) => setActorsInput(e.target.value)}
                            placeholder="e.g. Tom Hanks, Natalie Portman"
                            className="create-movie-modal__input"
                        />
                        {actorsInput.trim() === "" && (
                            <span className="create-movie-form-error">
                                At least one actor is required
                            </span>
                        )}
                    </div>

                    {/* Description */}
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

                    {/* Poster URL */}
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
                                    message: "Must be a valid URL starting with http:// or https://",
                                },
                            })}
                        />
                        {errors.posterUrl && (
                            <span className="create-movie-form-error">
                                {errors.posterUrl.message}
                            </span>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="create-movie-modal__field">
                        <label htmlFor="rating" className="create-movie-modal__label">
                            Rating (1–5)
                        </label>
                        <input
                            id="rating"
                            type="number"
                            min="1"
                            max="5"
                            className="create-movie-modal__input"
                            {...register("rating", {
                                required: "Rating is required",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Rating must be at least 1",
                                },
                                max: {
                                    value: 5,
                                    message: "Rating cannot be more than 5",
                                },
                            })}
                        />
                        {errors.rating && (
                            <span className="create-movie-form-error">{errors.rating.message}</span>
                        )}
                    </div>
                    {/* Buttons */}
                    <div className="create-movie-modal__actions">
                        <button
                            type="button"
                            onClick={onClose}
                            className="create-movie-button create-movie-button--secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="create-movie-button create-movie-button--primary"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
