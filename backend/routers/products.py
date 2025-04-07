from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import json
from typing import List, Optional
from database import get_db
from models import Product
import schemas
from sqlalchemy import func

router = APIRouter(tags=["products"])

@router.get("/products/", response_model=List[schemas.Product])
def get_all_products(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    products = db.query(Product).offset(skip).limit(limit).all()
    # Convert string representation of images to list
    for product in products:
        if isinstance(product.images, str):
            product.images = json.loads(product.images)
    return products

@router.get("/products/{product_id}", response_model=schemas.Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Convert string representation of images to list
    if isinstance(product.images, str):
        product.images = json.loads(product.images)
    
    return product

@router.post("/products/", response_model=schemas.Product, status_code=status.HTTP_201_CREATED)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    # Convert list of images to string for storage
    images_str = json.dumps(product.images)
    
    # Get the latest product id
    latest_product = db.query(func.max(Product.id)).scalar() or 0
    next_id = latest_product + 1
    
    # Create incremental pid
    incremental_pid = str(next_id)
    
    db_product = Product(
        pid=incremental_pid,
        name=product.name,
        price=product.price,
        stock=product.stock,
        description=product.description,
        images=images_str,
        category=product.category,
        is_masked=False
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    # Convert string representation of images back to list for response
    db_product.images = product.images
    
    return db_product

@router.put("/products/{product_id}", response_model=schemas.Product)
def update_product(
    product_id: int, 
    product_update: schemas.ProductUpdate, 
    db: Session = Depends(get_db)
):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update product attributes
    update_data = product_update.dict(exclude_unset=True)
    
    # Handle images list special case
    if "images" in update_data and update_data["images"] is not None:
        update_data["images"] = json.dumps(update_data["images"])
    
    for key, value in update_data.items():
        setattr(db_product, key, value)
    
    db.commit()
    db.refresh(db_product)
    
    # Convert string representation of images to list for response
    if isinstance(db_product.images, str):
        db_product.images = json.loads(db_product.images)
    
    return db_product

@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(db_product)
    db.commit()
    return None

@router.put("/products/{product_id}/mask", response_model=schemas.Product)
def mask_product(
    product_id: int, 
    amazon_fnsku: str,
    db: Session = Depends(get_db)
):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db_product.amazon_fnsku = amazon_fnsku
    db_product.is_masked = True
    
    db.commit()
    db.refresh(db_product)
    
    # Convert string representation of images to list for response
    if isinstance(db_product.images, str):
        db_product.images = json.loads(db_product.images)
    
    return db_product
