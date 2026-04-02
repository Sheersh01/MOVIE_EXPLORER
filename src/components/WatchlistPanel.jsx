import { useState } from "react";
import { posterUrl, formatYear, formatRating } from "../utils/helpers";

export default function WatchlistPanel({
  items,
  onOpenMovie,
  onRemove,
  onUpdate,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");
  const [editTags, setEditTags] = useState("");

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditNote(item.note || "");
    setEditTags((item.tags || []).join(", "));
  };

  const saveEdit = () => {
    if (editingId) {
      const tags = editTags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
      onUpdate(editingId, { note: editNote, tags });
      setEditingId(null);
    }
  };

  return (
    <div className="mb-8 border border-white/10 rounded-xl bg-white/5 p-6 animate-slide-down">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-white tracking-wider">
          WATCHLIST
        </h3>
        <span className="text-xs font-mono text-white/30">
          {items.length} items
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-6 animate-fade-in">
          <p className="text-white/40 text-sm font-body">
            Add movies to your watchlist to track what you want to watch.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`flex gap-3 p-3 bg-cinema-800/50 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-200 animate-slide-in-left watchlist-item-${Math.min(idx, 5)}`}
            >
              <div className="flex-shrink-0 w-12 h-16 rounded overflow-hidden bg-cinema-700">
                {item.poster_path ? (
                  <img
                    src={posterUrl(item.poster_path, "w92")}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white/20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="2" y="3" width="20" height="18" rx="2" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {editingId === item.id ? (
                  <div className="space-y-2 animate-scale-in">
                    <input
                      type="text"
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      placeholder="Personal notes…"
                      className="w-full text-xs bg-cinema-900 border border-white/15 rounded px-2 py-1 text-white placeholder-white/30 focus:outline-none focus:border-gold-400/40 focus:animate-glow-in transition-all duration-200"
                    />
                    <input
                      type="text"
                      value={editTags}
                      onChange={(e) => setEditTags(e.target.value)}
                      placeholder="Tags (comma separated)…"
                      className="w-full text-xs bg-cinema-900 border border-white/15 rounded px-2 py-1 text-white placeholder-white/30 focus:outline-none focus:border-gold-400/40 focus:animate-glow-in transition-all duration-200"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs px-2 py-1 rounded border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all duration-150 hover:scale-105 active:animate-button-press"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveEdit}
                        className="text-xs px-2 py-1 rounded border border-gold-400/40 bg-gold-400/10 text-gold-400 hover:border-gold-400/60 hover:shadow-lg hover:shadow-gold-400/20 transition-all duration-150 active:animate-button-press"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => onOpenMovie(item)}
                      className="text-sm font-body font-semibold text-white hover:text-gold-400 transition-all duration-200 text-left hover:scale-105 origin-left"
                    >
                      {item.title}
                    </button>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono text-white/40">
                        {formatYear(item.release_date)}
                      </span>
                      {item.vote_average > 0 && (
                        <span className="text-xs font-mono text-white/30">
                          ★ {formatRating(item.vote_average)}
                        </span>
                      )}
                    </div>
                    {item.note && (
                      <p className="text-xs text-white/50 font-body mt-1 max-w-lg">
                        {item.note}
                      </p>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {item.tags.map((tag, tagIdx) => (
                          <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 font-mono animate-scale-in"
                            style={{ animationDelay: `${tagIdx * 50}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {editingId !== item.id && (
                  <>
                    <button
                      onClick={() => startEdit(item)}
                      className="p-1.5 rounded border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all duration-150 hover:scale-110 hover:shadow-md hover:shadow-white/20 active:animate-button-press"
                      title="Edit notes and tags"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1.5 rounded border border-white/10 text-white/40 hover:text-coral-400 hover:border-coral-400/30 transition-all duration-150 hover:scale-110 hover:shadow-md hover:shadow-coral-400/20 active:animate-button-press"
                      title="Remove from watchlist"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
