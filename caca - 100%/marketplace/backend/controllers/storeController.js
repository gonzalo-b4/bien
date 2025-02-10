const Store = require('../models/Store');
const User = require('../models/User');

exports.createStore = async (req, res) => {
    const { name, description } = req.body;

    try {
        // Verificar si el usuario ya tiene una tienda
        const existingStore = await Store.findOne({ where: { ownerId: req.user.id } });
        if (existingStore) {
            return res.status(400).json({ msg: 'User already has a store' });
        }

        const store = await Store.create({
            name,
            description,
            ownerId: req.user.id,
            status: 'pending'
        });

        res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getStores = async (req, res) => {
    try {
        const stores = await Store.findAll({ include: [{ model: User, attributes: ['name', 'email'] }] });
        res.json(stores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getApprovedStores = async (req, res) => {
    try {
        const stores = await Store.findAll({ where: { status: 'approved' }, include: [{ model: User, attributes: ['name', 'email'] }] });
        res.json(stores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPendingStores = async (req, res) => {
    try {
        const stores = await Store.findAll({ where: { status: 'pending' }, include: [{ model: User, attributes: ['name', 'email'] }] });
        res.json(stores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getSuspendedStores = async (req, res) => {
    try {
        const stores = await Store.findAll({ where: { status: 'suspended' }, include: [{ model: User, attributes: ['name', 'email'] }] });
        res.json(stores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.approveStore = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);
        if (!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        store.status = 'approved';
        await store.save();
        res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.suspendStore = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);
        if (!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        store.status = 'suspended';
        await store.save();
        res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.rejectStore = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);
        if (!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        store.status = 'rejected';
        await store.save();
        res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteStore = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);
        if (!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        await store.destroy();
        res.json({ msg: 'Store removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.hasStore = async (req, res) => {
    try {
        const store = await Store.findOne({ where: { ownerId: req.user.id } });
        if (store) {
            return res.json({ hasStore: true });
        } else {
            return res.json({ hasStore: false });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.reactivateStore = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);
        if (!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        if (store.status !== 'suspended') {
            return res.status(400).json({ msg: 'Store is not suspended' });
        }

        store.status = 'active';
        await store.save();
        res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};