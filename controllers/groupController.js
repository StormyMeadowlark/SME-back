import Group from '../models/Group.js';
import User from '../models/User.js';

// Create a new group
export const createGroup = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the user is already in a group
        if (user.group) return res.status(400).json({ message: 'User is already in a group' });

        const defaultGroupName = name || `${user.lastName}` ||`${user.email.split('@')[0]}`; // Default to the user's last name or if it doesn't exist the user's email prefix

        const newGroup = new Group({
            name: defaultGroupName,
            members: [{ user: userId, role: 'Admin' }]
        });

        const savedGroup = await newGroup.save();

        // Add group to user's list of groups
        user.group = savedGroup._id;
        await user.save();

        res.status(201).json(savedGroup);
    } catch (error) {
        res.status(500).json({ message: 'Error creating group', error });
    }
};

// Get all groups for a user
export const getUserGroups = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).populate('group');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user.group ? [user.group] : []);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching groups', error });
    }
};

// Add a member to a group
export const addGroupMember = async (req, res) => {
    const { groupId, memberId, role } = req.body;
    const userId = req.user.id;

    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        // Check if the user is an admin
        const adminMember = group.members.find(member => member.user.toString() === userId && member.role === 'Admin');
        if (!adminMember) return res.status(403).json({ message: 'User is not an admin of this group' });

        // Check if the new member is already in a group
        const memberUser = await User.findById(memberId);
        if (memberUser.group) return res.status(400).json({ message: 'User is already in a group' });

        // Add the new member
        group.members.push({ user: memberId, role: role || 'Member' });
        await group.save();

        // Add group to the member's list of groups
        memberUser.group = groupId;
        await memberUser.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error adding member to group', error });
   
    }
}