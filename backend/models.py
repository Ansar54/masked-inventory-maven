
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    pid = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    price = Column(Float)
    stock = Column(Integer)
    description = Column(String)
    images = Column(String)  # Store as JSON string
    category = Column(String)
    amazon_fnsku = Column(String, nullable=True)
    is_masked = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
