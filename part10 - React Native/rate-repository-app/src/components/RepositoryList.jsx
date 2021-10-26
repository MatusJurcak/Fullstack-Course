import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import Item from './RepositoryItem';
import { Searchbar } from 'react-native-paper';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import Theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  textInput: {
    padding: 15,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: Theme.colors.textSecondary,
      borderRadius: 5,
  }
});

const orderedByOptions = [
  {
    label: 'Latest repositories',
    value: 'latest'
  },
  {
    label: 'Highest rated repositories',
    value: 'highestRating',
  },
  {
    label: 'Lowest rated repositories',
    value: 'lowestRating',
  },
];

const orderedBy = {
  latest: {
    orderedBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  highestRating: {
    orderedBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  lowestRating: {
    orderedBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const RepositoryListHeader = ({
  onOrderedByChange,
  order,
  searchKeyword,
  onSearchKeywordChange
}) => {
  return (
    <View style={{ padding: 15 }}>
      <View style = {{ marginBottom: 15 }}>
        <Searchbar
              onChangeText={onSearchKeywordChange}
              value={searchKeyword}
              placeholder="Search repositories"
            />
      </View> 
      <Picker
        mode="dropdown"
        selectedValue={order}
        onValueChange={onOrderedByChange}
      >
        {orderedByOptions.map(({ value, label }) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>
    </View>
  );
};


const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {
      onOrderedByChange,
      order,
      searchKeyword,
      onSearchKeywordChange,
    } = this.props;

    return (
      <RepositoryListHeader
        onOrderedByChange={onOrderedByChange}
        order={order}
        searchKeyword={searchKeyword}
        onSearchKeywordChange={onSearchKeywordChange}
      />
    );
  };

  render(){  
    const { repositories, onPress, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable key={item.id} onPress={() => onPress(item.id)}>
            <Item item={item} />
          </Pressable>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);
  const history = useHistory();
  const { repositories, fetchMore } = useRepositories({
      first: 4,
      orderBy: orderedBy[order].orderedBy,
      orderDirection: orderedBy[order].orderDirection,
      searchKeyword: debouncedKeyword
  });


  const onEndReach = () => {
    fetchMore();
  };


  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order} 
      onPress={(id) => history.push(`/repositories/${id}`)} 
      onOrderedByChange={(filter) => setOrder(filter)} 
      searchKeyword={searchKeyword}
      onSearchKeywordChange={(keyword) => setSearchKeyword(keyword)}
      onEndReach={onEndReach}
    />
    );
  };

export default RepositoryList;
