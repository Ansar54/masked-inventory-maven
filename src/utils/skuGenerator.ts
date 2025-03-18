
/**
 * Generates a FNSKU based on product information
 */
export const generateFNSKU = (category: string, productName: string, isMasked: boolean = false) => {
  const prefix = isMasked ? 'MSK' : 'REG';
  const categoryCode = category.substring(0, 3).toUpperCase();
  const nameInitials = productName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `${prefix}-${categoryCode}-${nameInitials}-${randomNum}`;
};

/**
 * Generates a unique PID (Product ID)
 */
export const generatePID = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 5);
  return `PID-${timestamp}-${randomStr}`.toUpperCase();
};
