exports.up = function(knex) {
	return knex.schema
		.createTable('users', (table) => {
			table.increments('id').primary();
			table.integer('github_id');
			table.string('password');
			table.string('avatar_url');
			table.string('username').notNullable();
			table.timestamp('created').defaultTo(knex.fn.now());
		})
		.createTable('exercises', (table) => {
			table.increments('id').primary();
			table.integer('creatorId').unsigned().notNullable();
			table.string('title', 50).notNullable();
			table.string('equipment', 50).notNullable();
			table.string('filename').notNullable();
			table.string('description', 255);
			table.integer('likes').unsigned().notNullable();
			table.timestamp('created').defaultTo(knex.fn.now());
			table
				.foreign('creatorId')
				.references('id')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		})
		.createTable('comments', (table) => {
			table.increments('id').primary();
			table.integer('exerciseId').unsigned().notNullable();
			table.string('comment', 255).notNullable();
			table.string('username').notNullable();
			table.timestamp('created').defaultTo(knex.fn.now());
			table
				.foreign('exerciseId')
				.references('id')
				.inTable('exercises')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		});
};

exports.down = function(knex) {
	return knex.schema.dropTable('comments').dropTable('exercises').dropTable('users');
};
