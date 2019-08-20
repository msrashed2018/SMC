package com.almostkbal.web.services.workflow.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="system_role")
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_ROLE")
	@Column(name = "role_id")
	private long id;
	
	@Column(name = "role_name", nullable = false, unique = true)
	private String name;
	
	@Column(name = "role_description")
	private String description;
	
//    @ManyToMany(fetch=FetchType.LAZY,
//			cascade= {CascadeType.PERSIST, CascadeType.MERGE,
//					 CascadeType.DETACH, CascadeType.REFRESH})
//	@JoinTable(
//			name="system_user_roles",
//			joinColumns=@JoinColumn(name="roles_role_id "),
//			inverseJoinColumns=@JoinColumn(name="users_user_id")
//			)
//    @JsonIgnore
	@ManyToMany(/*fetch=FetchType.LAZY,*/mappedBy = "roles")
	@JsonIgnore
    private List<User> users;
    
	public Role() {
		
	}
	public Role(String roleName) {
		this.name = roleName;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
//	@PreRemove
//	public void preRemove() {
//		for (User user : users) {
//			user.setRoles(null);
//		}
//	}
}
