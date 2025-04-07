
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ProductBase(BaseModel):
    pid: str
    name: str
    price: float
    stock: int
    description: str
    images: List[str]
    category: str
    
class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    pid: Optional[str] = None
    name: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    description: Optional[str] = None
    images: Optional[List[str]] = None
    category: Optional[str] = None
    amazon_fnsku: Optional[str] = None
    is_masked: Optional[bool] = None

class Product(ProductBase):
    id: int
    amazon_fnsku: Optional[str] = None
    is_masked: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
