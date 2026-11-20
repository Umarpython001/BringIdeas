"""change users table name to 'users'

Revision ID: 3b3802a9b75c
Revises: 63d1e16155dc
Create Date: 2026-11-20 15:01:49.485517

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '3b3802a9b75c'
down_revision: Union[str, Sequence[str], None] = '63d1e16155dc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""    
    op.rename_table('user_table', 'users')


def downgrade() -> None:
    """Downgrade schema."""    
    op.rename_table('users', 'user_table')