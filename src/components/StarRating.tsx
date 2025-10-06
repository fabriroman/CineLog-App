export interface StarRatingProps {
  value: number;          
  max?: number;       
  readOnly?: boolean;     
  onChange?: (value: number) => void;
}

export const StarRating = ({
  value,
  max = 5,
  readOnly = false,
  onChange,
}: StarRatingProps) => {
  const handleClick = (rating: number) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[...Array(max)].map((_, i) => {
        const ratingValue = i + 1;
        const isFilled = ratingValue <= value;

        return (
          <span
            key={i}
            onClick={() => handleClick(ratingValue)}
            style={{
              color: isFilled ? '#ffd700' : '#e4e5e9',
              fontSize: '16px',
              cursor: readOnly ? 'default' : 'pointer',
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};